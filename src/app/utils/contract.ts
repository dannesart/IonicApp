export enum ContractStatus {
  active = "active",
  waiting = "waiting",
  completed = "completed",
  denied = "denied",
  creation_failed = "CREATION_FAILED",
  released_by_notary = "RELEASED_BY_NOTARY",
}

interface ISigner {
  name: string;
  signed: boolean;
}

interface ICondition {
  name: string;
  description: string;
  status: ContractStatus;
}

interface IMileStone {
  name: string;
  conditions: ICondition[];
  signers: ISigner[];
  status: ContractStatus;
}

export interface IContract {
  name: string;
  milestones: IMileStone[];
  signers: ISigner[];
  status: ContractStatus;
}

export class Contract implements IContract {
  name;
  milestones;
  signers;
  status;

  constructor(
    name,
    milestones: IMileStone[],
    signers: ISigner[],
    status: ContractStatus
  ) {
    this.name = name;
    this.milestones = milestones;
    this.signers = signers;
    this.status = status;
  }
}
