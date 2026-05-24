"use client";

import { departments, completionStats } from "@/data/departments";
import { employees } from "@/data/employees";
import { trainingModules } from "@/data/training-modules";
import { Users, GraduationCap, TrendingUp, Clock, BookOpen, AlertCircle, ShieldAlert } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#1D4ED8', '#059669', '#D97706', '#0EA5E9', '#6366F1', '#475569', '#8B5CF6', '#DC2626'];

export default function DashboardPage() {
  const totalEmployees = departments.reduce((acc, curr) => acc + curr.employeeCount, 0);
  const avgCompletion = departments.reduce((acc, curr) => acc + curr.trainingCompletion, 0) / departments.length;

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--foreground)] mb-2 tracking-tight">Umumiy Ko'rsatkichlar</h1>
          <p className="text-[var(--muted-foreground)]">NeoBank xodimlarining o'quv jarayoni va komplayens holati.</p>
        </div>
        <div className="flex gap-3">
          <div className="chip chip-success">
            <ShieldAlert size={14} /> AML Komplayens: 98%
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Jami Xodimlar</h3>
            <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
              <Users size={20} className="text-[var(--primary)]" />
            </div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-[var(--foreground)]">{totalEmployees}</div>
          <p className="text-xs text-[var(--success)] flex items-center mt-2 font-medium">
            <TrendingUp size={14} className="mr-1" /> +12% o'tgan oydan
          </p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">O'rtacha Natija</h3>
            <div className="w-10 h-10 rounded-xl bg-[var(--success)]/10 flex items-center justify-center">
              <GraduationCap size={20} className="text-[var(--success)]" />
            </div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-[var(--foreground)]">{avgCompletion.toFixed(1)}%</div>
          <p className="text-xs text-[var(--success)] flex items-center mt-2 font-medium">
            <TrendingUp size={14} className="mr-1" /> +5.4% o'tgan oydan
          </p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Faol Kurslar</h3>
            <div className="w-10 h-10 rounded-xl bg-[var(--warning)]/10 flex items-center justify-center">
              <BookOpen size={20} className="text-[var(--warning)]" />
            </div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-[var(--foreground)]">12</div>
          <p className="text-xs text-[var(--muted-foreground)] flex items-center mt-2 font-medium">
            <Clock size={14} className="mr-1" /> 2 ta yangi kurs qo'shildi
          </p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Kechikkan Vazifalar</h3>
            <div className="w-10 h-10 rounded-xl bg-[var(--danger)]/10 flex items-center justify-center">
              <AlertCircle size={20} className="text-[var(--danger)]" />
            </div>
          </div>
          <div className="text-3xl font-bold tracking-tight text-[var(--foreground)]">8</div>
          <p className="text-xs text-[var(--danger)] flex items-center mt-2 font-medium">
            <TrendingUp size={14} className="mr-1" /> O'tgan haftadan oshgan
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Trend Chart */}
        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="text-lg font-bold mb-6 text-[var(--foreground)]">O'qish Dinamikasi (6 oy)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={completionStats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'var(--muted-foreground)', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--muted-foreground)', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}
                  itemStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="completion" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorCompletion)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Pie Chart */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6 text-[var(--foreground)]">Bo'limlar Progressi</h3>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departments}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="trainingCompletion"
                  stroke="none"
                >
                  {departments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [`${value}%`, 'Tugallangan']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-extrabold text-[var(--foreground)]">{avgCompletion.toFixed(0)}%</span>
              <span className="text-xs text-[var(--muted-foreground)] font-semibold uppercase tracking-wider mt-1">O'rtacha</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[var(--foreground)]">Xodimlar Faolligi</h3>
            <button className="text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]">Barchasi</button>
          </div>
          <div className="space-y-4">
            {employees.map((emp) => (
              <div key={emp.id} className="flex items-center p-3 rounded-xl hover:bg-[var(--muted)] transition-colors border border-transparent hover:border-[var(--border)]">
                <div className="w-10 h-10 rounded-full bg-[var(--gradient-navy)] text-[var(--accent-light)] flex items-center justify-center font-bold text-sm mr-4 shadow-sm">
                  {emp.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-[var(--foreground)]">{emp.name}</h4>
                    <span className="text-[10px] font-semibold text-[var(--muted-foreground)]">{emp.id}</span>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{emp.recentActivity}</p>
                </div>
                <div className="text-right">
                  <span className={`chip ${emp.level === 'Senior' ? 'chip-warning' : 'chip-primary'}`}>{emp.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Modules */}
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[var(--foreground)]">Mashhur Bank Modullari</h3>
            <button className="text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]">Modullar</button>
          </div>
          <div className="space-y-4">
            {trainingModules.slice(0, 4).map((mod, i) => (
              <div key={mod.id} className="flex items-center p-3 rounded-xl border border-[var(--border)] hover:border-[var(--primary)] transition-colors bg-[var(--background)]">
                <div className="w-8 h-8 rounded-lg bg-[var(--muted)] flex items-center justify-center font-bold text-[var(--muted-foreground)] mr-4">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-[var(--foreground)] line-clamp-1">{mod.title}</h4>
                  <p className="text-xs text-[var(--muted-foreground)] flex gap-3 mt-1">
                    <span className="font-medium text-[var(--primary)]">{mod.category}</span>
                    <span>•</span>
                    <span>{mod.enrolled} ishtirokchi</span>
                  </p>
                </div>
                <div className="flex items-center bg-[var(--muted)] px-2 py-1 rounded-md">
                  <span className="text-xs font-bold text-[var(--warning)] mr-1">★</span>
                  <span className="text-xs font-bold text-[var(--foreground)]">{mod.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
