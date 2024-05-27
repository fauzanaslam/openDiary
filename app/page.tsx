import Wrapper from "@/components/global/Wrapper";
import CardDiaries from "../components/global/(diary)/CardDiaries";
import Search from "../components/global/Search";

export const revalidate = 0;

export default function page(): React.ReactElement {
  return (
    <>
      <Search />
      <Wrapper title="Explore Diary">
        <CardDiaries />
      </Wrapper>
    </>
  );
}
