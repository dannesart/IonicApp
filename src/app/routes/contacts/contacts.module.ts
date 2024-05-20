import { FooterModule } from "@/ui/footer/header.module";
import { IonicModule } from "@ionic/angular/";
import { ContactsComponent } from "./contacts.component";
import { ContactsRoutingModule } from "./contacts-routing.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NewContractModule } from "@/ui/new-contract/new-contract.module";
import { MiniContractModule } from "@/ui/mini-contract/mini-contract.module";
import { NewContactModule } from "@/ui/new-contact/new-contact.module";
import { EditContactModule } from "@/ui/edit-contact/edit-contact.module";
import { UtilsModule } from "@/utils";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ContactsRoutingModule,
    IonicModule,
    FooterModule,
    NewContractModule,
    MiniContractModule,
    NewContactModule,
    EditContactModule,
    UtilsModule,
    FormsModule,
  ],
  exports: [ContactsComponent],
  declarations: [ContactsComponent],
})
export class ContactsModule {}
