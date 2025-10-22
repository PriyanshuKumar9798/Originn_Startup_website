import ScrollStack, { ScrollStackItem } from './ui/scroll-stack'

const DisappearingFeatures = () => {
  const features = [
    {
      title: "Apply & Get Verified",
      description: "Begin by submitting your application on our portal. Every startup undergoes a rigorous hybrid AI-human vetting process to ensure a high-quality, trusted ecosystem for everyone involved.",
      icon: "🛡️"
    },
    {
      title: "Build Your Showcase & Get Discovered",
      description: "Once approved, access your dashboard to create a compelling startup profile. After a final review, your page goes live, placing you in front of a dedicated community of early adopters ready to discover India's next big thing.",
      icon: "🚀"
    },
    {
      title: "Validate Your Product with Pre-Orders",
      description: "When you're ready to prove demand, apply to launch a pre-order campaign. A successful campaign provides indisputable, tangible proof of product-market fit and secures the working capital for production.",
      icon: "🛒"
    },
    {
      title: "Milestone-Based Escrow Funding",
      description: "Backer funds are never sent directly to you. They are held in a campaign-specific, RBI-regulated digital escrow account. Funds are only released in tranches after our team verifies you've hit pre-defined production milestones.",
      icon: "🔒"
    },
    {
      title: "Bridge to Professional Investors",
      description: "Your success generates powerful data. We provide professional investors with access to the 'Originn Intelligence' dashboard, which shows your verified pre-sale revenue, customer analytics, and traction data, turning investor speculation into evidence-based decisions.",
      icon: "📊"
    }
  ]

  return (
    <section className="relative bg-[#f9faff] py-8">
    

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Section - Sticky Content */}
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Startup Journey on Originn.co.in
              </h2>
              <p className="text-sm text-slate-600 max-w-lg leading-relaxed mx-auto lg:mx-0">
                A structured pathway from validation to funding. Follow these steps to launch successfully on our platform.
              </p>
            </div>

            {/* Right Section - ScrollStack */}
            <div className="h-[600px]">
              <ScrollStack
                itemDistance={40}
                itemScale={0.03}
                itemStackDistance={15}
                stackPosition="30%"
                scaleEndPosition="15%"
                baseScale={0.9}
                rotationAmount={1}
                blurAmount={0.5}
                className="h-full"
                onStackComplete={() => console.log("Stack animation complete!")}
              >
                {features.map((feature, index) => (
                  <ScrollStackItem key={index} itemClassName="bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {index + 1}
                      </div>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{feature.title}</h3>
                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-4">{feature.description}</p>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-linear-to-r from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </ScrollStackItem>
                ))}
              </ScrollStack>
            </div>
          </div>
        </div>
    </section>
  )
}

export default DisappearingFeatures
