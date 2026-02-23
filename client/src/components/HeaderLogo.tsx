import IconClaroLogo from "@/components/svg/IconClaroLogo";

export default function HeaderLogo() {
  return (
    <header id="header-n2bl">
      <a href="/">
        <span id="header__national">national</span>
        <span id="header__pokedex">
          P<IconClaroLogo id="header__icon-o" />
          kedéx
        </span>
        <span id="header__made-by">by (@N)²iBL</span>
      </a>
    </header>
  );
}
