import AdminLayout from "../../pages/admin/layouts/AdminLayout";

import useLeads from "../hooks/useLeads";

import useConsultations from "../hooks/useConsultations";

import LeadStatsCard from "../components/LeadStatsCard";

export default function LeadsDashboard() {

  const {
    leads,
    loading,
  } = useLeads();

  const {
    consultations,
    loading: consultationsLoading,
  } = useConsultations();

  if (loading || consultationsLoading) {
    return (
      <AdminLayout>
        <div className="p-6">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  const total = leads.length + consultations.length;

  const workVisa =
    leads.filter(
      (l) =>
        l.service ===
        "Work Visa"
    ).length;

  const touristVisa =
    leads.filter(
      (l) =>
        l.service ===
        "Tourist Visa"
    ).length;

  const visaAI =
    leads.filter(
      (l) =>
        l.service ===
        "Visa AI"
    ).length;

  // const visaCourses =
  //   leads.filter(
  //     (l) =>
  //       l.service ===
  //       "Visa Courses"
  //   ).length;

  return (
    <AdminLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold">
            Lead Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor all incoming leads
          </p>

        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-5
            gap-4
          "
        >

          <LeadStatsCard
            title="Total Leads"
            value={total}
            color="bg-slate-900"
          />

          <LeadStatsCard
            title="Work Visa"
            value={workVisa}
            color="bg-blue-600"
          />

          <LeadStatsCard
            title="Tourist Visa"
            value={touristVisa}
            color="bg-green-600"
          />

          <LeadStatsCard
            title="Visa AI"
            value={visaAI}
            color="bg-purple-600"
          />

          {/* <LeadStatsCard
            title="Visa Courses"
            value={visaCourses}
            color="bg-orange-600"
          /> */}

          <LeadStatsCard
            title="Consultation Leads"
            value={consultations.length}
            color="bg-pink-600"
          />

        </div>

      </div>

    </AdminLayout>
  );
}