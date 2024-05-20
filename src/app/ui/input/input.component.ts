import { isValidPhone } from "@/utils/formatter";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { countries } from "countries-list";

export enum InputTypes {
  text = "text",
  user = "user",
  date = "date",
  number = "number",
  numberSelect = "numberSelect",
  phone = "phone",
  code = "code",
  amount = "amount"
}

@Component({
  selector: "p-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent implements OnInit, OnChanges {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() value: string;
  @Input() disabled: boolean = false;
  @Input() type: InputTypes = InputTypes.text;
  @Input() clearInput: boolean = false;
  @Input() autoFocus: boolean = false;
  @Input("country") currentPhone: string = "46";
  @Input("currency") currentCurrency: string;
  @Input("currencies") currencies = [];
  public currentValue;
  private validCountries = ["SE", "IS", "NL", "IN", "US", "ES"];
  public countries = [];
  public isValid = true;
  public types = InputTypes;
  public saveToContact = false;
  public showDate = false;
  public isFocus = false;

  public setFocus = (bool: boolean) => {
    this.isFocus = bool;
  };

  @Output() valueChange = new EventEmitter();
  @Output() validationChange = new EventEmitter();
  @Output() countryChange = new EventEmitter();
  @Output() currencyChange = new EventEmitter();

  public validate = (input) => {
    const value = input.target.value;
    let valid;
    if (this.type === InputTypes.phone || this.type === InputTypes.user) {
      valid = isValidPhone(value);
    } else {
      valid = true;
    }

    if ((!this.isValid && valid) || (this.isValid && !valid)) {
      this.validationChange.emit(valid);
    }
    this.isValid = valid;
  };

  public formatInput = (input) => {
    const value = input.target.value;
    if (this.type === InputTypes.phone || this.type === InputTypes.user) {
      // TODO: Have a look at this. See if the is needed.
      // const newValue = phoneFormatter(value);
      this.value = value;
    }
  };

  public handleInputChange = (event) => {
    this.formatInput(event);
    this.validate(event);
    if (this.type === this.types.user) {
      this.valueChange.emit({
        value: this.value,
        saveToContact: this.saveToContact,
      });
    } else if (this.type === this.types.phone) {
      this.valueChange.emit({
        value: "+" + this.currentPhone + event.target.value,
      });
    } else {
      this.valueChange.emit({ value: event.target.value });
    }
  };

  public handleCurrencyChange = ($event) => {
    const value = $event.target.value;
    this.currencyChange.emit(value);
  }

  public handleCountryChange = ($event) => {
    const { value } = $event.target;
    this.currentPhone = value;
    this.countryChange.emit(value);
  };

  private setCurrentValue = (value) => {
    if (this.type === this.types.phone && value) {
      const containsCountry = value.startsWith("+");
      const countryCode = this.currentPhone;
      if (containsCountry && countryCode) {
        this.currentValue = value.replace(`+${countryCode}`, "");
        return;
      }
    }
    this.currentValue = value;
  };

  private setCountries = () => {
    this.countries.length = 0;
    this.validCountries.map((valid) => {
      this.countries.push(countries[valid]);
    });
    this.countries = this.countries.sort((a, b) => {
      return Number(a.phone) < Number(b.phone) ? -1 : 1;
    });
  };


  constructor() {
    if (this.value) {
      this.setCurrentValue(this.value);
    }
    this.countryChange.emit(this.currentPhone);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setCurrentValue(this.value);
    this.setCountries();
  }

  ngOnInit() {}
}
