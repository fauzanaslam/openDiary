import Navbar from "@/components/global/(navbar)/Navbar";
import Wrapper from "@/components/global/Wrapper";
import CardDiaries from "../components/global/(diary)/CardDiaries";

export const revalidate = 0;

export default function page(): React.ReactElement {
  return (
    <Wrapper title="Home">
      <CardDiaries />
    </Wrapper>
  );
}
