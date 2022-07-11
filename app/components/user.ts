import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import {
  Member,
  DataCompleted,
  Status,
} from 'ember-typescript-playground/routes';

interface UserArgs {
  member: any;
}

type UserDataCompleted = DataCompleted<Member>;

const isMinimumDataCompleted = (m: UserDataCompleted): boolean => {
  return [m.name, m.age, m.email].every((v) => v === true);
};

export default class User extends Component<UserArgs> {
  @tracked
  expanded = false;

  @tracked
  member: Member = this.args.member;

  get isGratherThanSeventeen() {
    return this.member.age && this.member.age > 17;
  }

  get isPending() {
    return this.member.status === Status.PENDING;
  }

  approvePendingUserStatus(status: Status) {
    this.member = { ...this.member, status };
  }

  @action
  approve() {
    this.approvePendingUserStatus(Status.APPROVED);
  }

  get isUserDataCompleted() {
    const userDataCompleted = this.transformUserDataCompleted();
    console.log(userDataCompleted);
    return isMinimumDataCompleted(userDataCompleted);
  }

  transformUserDataCompleted(): UserDataCompleted {
    const obj: UserDataCompleted = {};
    const keys = Object.keys(this.member) as Array<keyof typeof this.member>;
    keys.map((key) => {
      obj[key] = key in this.member && this.member[key] !== undefined;
    });
    return obj;
  }
}
