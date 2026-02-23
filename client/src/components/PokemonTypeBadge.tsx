import "@/styles/pkmn-types.scss";

export interface PokemonTypeBadgeProps extends React.PropsWithChildren {
  type: string;
}

export default function PokemonTypeBadge({ children, type }: PokemonTypeBadgeProps) {

  const cls = ["pkmn-type-badge", `pkmn-type-${type}`]
  return (
    <span className={cls.join(" ")} >{children}</span>
  )
}

