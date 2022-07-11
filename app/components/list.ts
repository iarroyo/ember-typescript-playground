import Component from '@glimmer/component';
import { Member, Dog, Item } from 'ember-typescript-playground/routes';

interface ListArgs {
  items: Item[];
}

//type guard with predicate
const isAdaptedMemeber = (item: Item): item is Member => {
  return (item as Member).email !== undefined;
};

export default class List extends Component<ListArgs> {
  get users(): Member[] {
    return this.args.items.filter((item: Item) =>
      isAdaptedMemeber(item)
    ) as Member[];
  }

  get dogs(): Dog[] {
    return this.args.items.filter(
      (item: Item) => !isAdaptedMemeber(item)
    ) as Dog[];
  }
}
