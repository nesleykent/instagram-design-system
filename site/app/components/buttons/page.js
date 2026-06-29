import ComponentGuidePage from "@/components/docs/ComponentGuidePage";
import { getComponentGuide } from "@/lib/component-guides";

export const metadata = { title: "Buttons" };

export default function ButtonsPage() {
  return <ComponentGuidePage guide={getComponentGuide("buttons")} />;
}
