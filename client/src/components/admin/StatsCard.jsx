// client/src/components/admin/StatsCard.jsx

import React from "react";

/**
 * Dark SaaS Stats Card
 * Props:
 *  - label: string
 *  - value: string | number
 *  - trend?: string
 *  - highlight?: boolean
 */

const StatsCard = ({ label, value, trend, highlight = false }) => {
  return (
    <div
      className={`
        bg-card border border-borderSubtle rounded-2xl p-6
        shadow-card transition-all duration-300
        ${highlight ? "shadow-glow border-primary/40" : ""}
        hover:bg-cardHover
      `}
    >
      {/* ✅ Label */}
      <p className="text-sm font-medium text-muted">
        {label}
      </p>

      {/* ✅ Value + Trend */}
      <div className="mt-4 flex items-center justify-between">
        <h3 className="text-3xl font-semibold text-white">
          {value}
        </h3>

        {trend && (
          <span
            className={`text-sm font-medium ${
              trend.startsWith("-")
                ? "text-danger"
                : "text-success"
            }`}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;