import React from 'react';
import { BookOpen, DollarSign, TrendingUp, Cpu, Cloud, Wrench, Calendar, Target, Zap, Download } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-vebuiln-corporate-blue text-white px-6 py-4">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 mr-3" />
              <h1 className="text-3xl font-bold">Documentation</h1>
            </div>
            <p className="mt-2 text-lg">Understanding BELC Retail Cost Metrics and Concepts</p>
          </div>

          <div className="p-6 space-y-8">
            {/* Cost Components Section */}
            <section>
              <div className="flex items-center mb-4">
                <DollarSign className="w-6 h-6 text-vebuiln-corporate-blue mr-2" />
                <h2 className="text-2xl font-bold text-vebuiln-charcoal">Cost Components</h2>
              </div>
              <p className="text-gray-600 mb-6">Breakdown of all expenses involved in deploying and maintaining BELC systems across retail locations.</p>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-vebuiln-charcoal mb-2">Hardware CAPEX</h3>
                  <p className="text-gray-700">Capital expenditure for hardware equipment (cameras, edge devices) purchased when opening new stores.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-vebuiln-charcoal mb-2">AWS Cost</h3>
                  <p className="text-gray-700">Monthly cloud computing costs for all active stores, including data processing and storage.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-vebuiln-charcoal mb-2">Maintenance Cost</h3>
                  <p className="text-gray-700">Annual maintenance expenses calculated as a percentage of total hardware cost.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-vebuiln-charcoal mb-2">Monthly Running Cost</h3>
                  <p className="text-gray-700">Recurring operational costs per month (AWS + Maintenance), excluding hardware CAPEX.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-vebuiln-charcoal mb-2">Cumulative Cost</h3>
                  <p className="text-gray-700">Total accumulated costs from project start, including all CAPEX and running costs.</p>
                </div>
              </div>
            </section>

            {/* Project Phases Section */}
            <section>
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-vebuiln-corporate-blue mr-2" />
                <h2 className="text-2xl font-bold text-vebuiln-charcoal">Project Phases</h2>
              </div>
              <p className="text-gray-600 mb-6">Stages of BELC deployment from initial setup to full-scale expansion.</p>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-vebuiln-charcoal mb-2">Phase-0</h3>
                  <p className="text-gray-700">Initial development and testing phase with minimal hardware setup.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-vebuiln-charcoal mb-2">Phase-1</h3>
                  <p className="text-gray-700">First store deployment and initial market testing.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-vebuiln-charcoal mb-2">Phase-2+</h3>
                  <p className="text-gray-700">Full-scale expansion with regular store openings based on growth projections.</p>
                </div>
              </div>
            </section>

            {/* Key Metrics Section */}
            <section>
              <div className="flex items-center mb-4">
                <Target className="w-6 h-6 text-vebuiln-corporate-blue mr-2" />
                <h2 className="text-2xl font-bold text-vebuiln-charcoal">Key Metrics</h2>
              </div>
              <p className="text-gray-600 mb-6">Essential measurements for tracking BELC project success and costs.</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-vebuiln-charcoal mb-2">Per-Store Costs</h3>
                  <p className="text-gray-700 mb-2">Average cost breakdown per retail location.</p>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Hardware: $5,000/store</li>
                    <li>Monthly running: $700/store</li>
                    <li>Maintenance: $500/store/year</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-vebuiln-charcoal mb-2">Range-Based Estimation</h3>
                  <p className="text-gray-700 mb-2">Cost projections with minimum and maximum ranges.</p>
                  <p className="text-gray-600">Example: $4,500 - $6,500 per store (accounting for variables).</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-vebuiln-charcoal mb-2">Milestones</h3>
                  <p className="text-gray-700 mb-2">Key project checkpoints and achievements.</p>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Phase-0 completion</li>
                    <li>First store live</li>
                    <li>10-store milestone</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-vebuiln-charcoal mb-2">Projections</h3>
                  <p className="text-gray-700 mb-2">Future cost and performance forecasts.</p>
                  <p className="text-gray-600">12-month projection: $150K total investment for 10 stores.</p>
                </div>
              </div>
            </section>

            {/* Other Concepts Section */}
            <section>
              <div className="flex items-center mb-4">
                <Zap className="w-6 h-6 text-vebuiln-corporate-blue mr-2" />
                <h2 className="text-2xl font-bold text-vebuiln-charcoal">Other Concepts</h2>
              </div>
              <p className="text-gray-600 mb-6">Additional important concepts for understanding BELC deployments.</p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Cpu className="w-5 h-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-vebuiln-charcoal mb-2">Edge Devices vs Cameras</h3>
                    <p className="text-gray-700 mb-2">Edge devices process data locally, while cameras capture video feed.</p>
                    <p className="text-gray-600">Edge devices enable real-time AI processing without constant cloud uploads.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-vebuiln-charcoal mb-2">Stores per Month Scaling</h3>
                    <p className="text-gray-700 mb-2">Rate of new store deployments, typically 2-5 stores monthly in Phase-2+.</p>
                    <p className="text-gray-600">Scaling affects cost efficiency through bulk purchasing and process optimization.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Download className="w-5 h-5 text-purple-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-vebuiln-charcoal mb-2">Export Functionality</h3>
                    <p className="text-gray-700 mb-2">Ability to download cost reports and projections in various formats.</p>
                    <p className="text-gray-600">Supports CSV, PDF exports for sharing with stakeholders and record-keeping.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;