import React from "react";
import { Timeline } from "./timeline";
import { Zap, Shield, User, Rocket, DollarSign } from "lucide-react";

export function TimelineDemo() {
  const data = [
    {
      title: "Get Verified",
      content: (
        <div>
          <p className="text-slate-700 text-xs md:text-sm font-normal mb-8">
            AI-human vetting ensures quality
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-slate-800">AI Verification</span>
              </div>
              <p className="text-xs text-slate-600">Automated quality checks and validation</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-slate-800">Human Review</span>
              </div>
              <p className="text-xs text-slate-600">Expert team reviews your application</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-slate-800">Quick Approval</span>
              </div>
              <p className="text-xs text-slate-600">Get verified within 24-48 hours</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-slate-800">Quality Assurance</span>
              </div>
              <p className="text-xs text-slate-600">Only verified startups get featured</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Build Profile",
      content: (
        <div>
          <p className="text-slate-700 text-xs md:text-sm font-normal mb-8">
            Create your showcase page
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-slate-800">Company Profile</span>
              </div>
              <p className="text-xs text-slate-600">Build a compelling company showcase</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-slate-800">Product Showcase</span>
              </div>
              <p className="text-xs text-slate-600">Highlight your products and services</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-slate-800">Team Stories</span>
              </div>
              <p className="text-xs text-slate-600">Share your founding team's journey</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-slate-800">Trust Badges</span>
              </div>
              <p className="text-xs text-slate-600">Display verification and achievements</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Launch Campaign",
      content: (
        <div>
          <p className="text-slate-700 text-xs md:text-sm font-normal mb-8">
            Validate with pre-orders
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-slate-800">Campaign Launch</span>
              </div>
              <p className="text-xs text-slate-600">Go live with your startup campaign</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-slate-800">Pre-orders</span>
              </div>
              <p className="text-xs text-slate-600">Start collecting pre-orders and validation</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-slate-800">Customer Feedback</span>
              </div>
              <p className="text-xs text-slate-600">Gather valuable user insights</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-slate-800">Market Validation</span>
              </div>
              <p className="text-xs text-slate-600">Prove product-market fit</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Secure Funding",
      content: (
        <div>
          <p className="text-slate-700 text-xs md:text-sm font-normal mb-8">
            Escrow-protected payments
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-slate-800">Secure Payments</span>
              </div>
              <p className="text-xs text-slate-600">Escrow-protected funding transactions</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-slate-800">Investor Protection</span>
              </div>
              <p className="text-xs text-slate-600">Both parties are protected in transactions</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-slate-800">Milestone Tracking</span>
              </div>
              <p className="text-xs text-slate-600">Track progress and release funds accordingly</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-slate-800">Success Metrics</span>
              </div>
              <p className="text-xs text-slate-600">Monitor ROI and growth indicators</p>
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
