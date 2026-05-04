import bodyContent from "./body-content";
import FramerAnimationInjector from "./FramerAnimationInjector";
import InteractionEnhancer from "./InteractionEnhancer";

export default function HousemoodPage() {
  return (
    <>
      <FramerAnimationInjector />
      <InteractionEnhancer />
      <main
        dangerouslySetInnerHTML={{ __html: bodyContent }}
        style={{ background: "#ffffff", color: "#000000" }}
      />
    </>
  );
}
