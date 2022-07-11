import Route from '@ember/routing/route';
import { service } from '@ember/service';
import HttpService from 'ember-typescript-playground/services/http-service';

//export type Status = 'APPROVED' | 'PENDING';

export enum Status {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
}

export type Member = {
  createdAt: string;
  name: string;
  age?: number;
  avatar: string;
  lastName: string;
  country: string;
  email: string;
  status: Status;
  id: string;
};

export type Dog = {
  name: string;
};

// eslint-disable-next-line no-undef
export interface AdaptedMember extends Omit<Member, 'status'> {
  status: Array<Status>;
}

export type DataCompleted<Type> = {
  [Property in keyof Type]?: boolean;
};

export type Item = Member | Dog;

export default class Index extends Route {
  @service('http-service')
  httpService!: HttpService;

  async model() {
    const items = [];

    /* const memebersResponse = await fetch(
      'https://5f7dc195834b5c0016b06816.mockapi.io/api/v1/users'
    );
    const members = await memebersResponse.json();
  */

    /*
    const dogsResponse = await fetch(
      'https://5f7dc195834b5c0016b06816.mockapi.io/api/v1/dogs'
    );

    const dogs: Dog[] = await dogsResponse.json();
    */

    const members = await this.httpService.GET<AdaptedMember[]>(
      'https://5f7dc195834b5c0016b06816.mockapi.io/api/v1/users'
    );

    const dogs = await this.httpService.GET<Dog[]>(
      'https://5f7dc195834b5c0016b06816.mockapi.io/api/v1/dogs'
    );

    items.push(
      ...members.map((member: AdaptedMember): Member => {
        const age = Math.floor(Math.random() * 100) + 1;
        const nullOddAges = age % 2 === 0 ? age : undefined;
        const status = member.status.at(
          Math.round(Math.random() / 1) * 1
        ) as Status;
        return { ...member, age: nullOddAges, status };
      })
    );
    items.push(...dogs);
    return items;
  }
}
