import { useParams } from "react-router";

export default function PokemonDetails() {
  const { id } = useParams();

  return (
    <>
      <h1>{id}</h1>
      <div>Stuff</div>
    </>
  );
}
