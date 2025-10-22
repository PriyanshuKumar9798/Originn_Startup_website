import ScrollStack, { ScrollStackItem } from "./scroll-stack";

const DemoScrollStack = () => {
  return (
    <div className="w-full h-screen">
      <ScrollStack
        itemDistance={120}
        baseScale={0.8}
        itemScale={0.05}
        rotationAmount={3}
        blurAmount={1.5}
        onStackComplete={() => console.log("Stack complete!")}
      >
        {[...Array(6)].map((_, i) => (
          <ScrollStackItem key={i}>
            <div className="text-2xl font-bold text-center text-white bg-blue-500 h-full flex items-center justify-center rounded-[30px]">
              Card #{i + 1}
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  );
};

export default DemoScrollStack;

