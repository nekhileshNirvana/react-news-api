import { AbilityBuilder, createMongoAbility } from '@casl/ability'

export default function defineAbilityFor(role) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (role.role_name === "guest") {
    cannot('add', 'Post'); // read-write access to everything
  } else if(role.role_name === "admin") {
    can('add', 'Post');
    can('delete','Post');
    can('edit','Article'); // read-only access to everything
  }

  return build();
}