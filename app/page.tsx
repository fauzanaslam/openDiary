import Wrapper from "@/components/global/Wrapper";
import CardDiaries from "../components/global/(diary)/CardDiaries";

export const revalidate = 0;

export default function page(): React.ReactElement {
  return (
    <Wrapper title="Explore DiaryY">
      <CardDiaries />
    </Wrapper>
  );
}
