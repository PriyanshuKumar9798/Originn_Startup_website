const AboutOriginn = () => {
  const features = [
    {
      title: "A Platform for Discovery",
      description: "Originn is a curated ecosystem showcasing India's most promising ventures. We engage in direct outreach to identify high-potential startups from leading incubators, accelerators, university innovation hubs, and design schools. By joining, you position your venture within a movement celebrating the \"Make in India\" spirit.",
      borderColor: "border-gray-300"
    },
    {
      title: "De-Risking Pre-Orders",
      description: "Our mandatory digital escrow system addresses the biggest hurdle in pre-orders: trust. When backers pre-order, funds are held in RBI-regulated escrow accounts, not transferred directly to you. This immediately mitigates backer fear and builds the confidence needed for upfront commitments.",
      borderColor: "border-green-400"
    },
    {
      title: "Milestone-Based Funding",
      description: "We work with you to break down your production plan into clear, verifiable milestones. Funds are released in pre-agreed tranches only after our team verifies milestone completion. This provides structured working capital and gives backers radical transparency.",
      borderColor: "border-purple-400"
    },
    {
      title: "Bridge to Investors",
      description: "For startups demonstrating significant traction, we offer access to a hyper-exclusive network of accredited investors. Your verified campaign data becomes powerful evidence of product-market fit, transforming investor decisions from speculation to evidence-based confidence.",
      borderColor: "border-gray-300"
    }
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold ring-1 ring-blue-200 mb-6">
            About Originn
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4">
            We're building India's most credible platform for startup discovery and validation
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mb-6 mx-auto lg:mx-0">
            Originn is a curated ecosystem designed to showcase India's most promising ventures. Position your startup within the "Make in India" movement and turn your idea into a market‑validated product.
          </p>

          <div className="grid grid-cols-2 gap-6 max-w-md mt-8 mx-auto lg:mx-0">
            <div>
              <div className="text-2xl font-extrabold text-blue-600">₹0</div>
              <div className="text-xs text-slate-500">Platform Fee</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-emerald-600">100%</div>
              <div className="text-xs text-slate-500">Escrow Protected</div>
            </div>
          </div>
        </div>

        <div className="bg-white/70 supports-backdrop-filter:bg-white/60 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_12px_40px_rgba(2,6,23,0.12)] p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-6">Platform Features</h2>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="border-l-4 border-blue-200 pl-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutOriginn
