import { notFound } from "next/navigation";
import ComponentGuidePage from "@/components/docs/ComponentGuidePage";
import { DYNAMIC_COMPONENT_GUIDES, getComponentGuide } from "@/lib/component-guides";

export function generateStaticParams() {
  return DYNAMIC_COMPONENT_GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = getComponentGuide(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
  };
}

export default async function DynamicComponentPage({ params }) {
  const { slug } = await params;
  const guide = getComponentGuide(slug);
  if (!guide) notFound();

  return <ComponentGuidePage guide={guide} />;
}
