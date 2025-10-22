import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold ring-1 ring-blue-200 mb-6">India's Premier Startup Launch Platform</div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4">Launch India's Next Big Thing</h1>
          <p className="text-lg text-slate-600 max-w-xl mb-6">Originn is a curated ecosystem designed to showcase India's most promising ventures. Position your startup within the "Make in India" movement and turn your idea into a market‑validated product.</p>

          <div className="grid grid-cols-3 gap-6 max-w-md mt-8">
            <div>
              <div className="text-2xl font-extrabold text-blue-600">₹0</div>
              <div className="text-xs text-slate-500">Platform Fee</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-emerald-600">100%</div>
              <div className="text-xs text-slate-500">Escrow Protected</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-indigo-600">24/7</div>
              <div className="text-xs text-slate-500">Support</div>
            </div>
          </div>
        </div>

        <div className="bg-white/70 supports-backdrop-filter:bg-white/60 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_12px_40px_rgba(2,6,23,0.12)] p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-1">Sign In</h2>
          <p className="text-sm text-slate-600 mb-6">Access your Originn account</p>
          <form className="grid gap-4" aria-label="Sign in form">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input id="email" type="email" required placeholder="you@startup.com" className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                <Link to="#" className="text-xs text-blue-600 hover:underline">Forgot password?</Link>
              </div>
              <input id="password" type="password" required className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <Button type="submit" variant="primary" size="md" className="mt-2 w-full">Sign In</Button>
          </form>
          <div className="text-center text-sm text-slate-600 mt-6 mb-4">Don't have an account?</div>
          <Button asChild variant="secondary" size="md" className="w-full">
            <Link to="/register">Register Your Startup</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
