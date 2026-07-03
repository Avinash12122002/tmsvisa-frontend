import { useState } from "react";

import AdminLayout from "../../pages/admin/layouts/AdminLayout";

import useConsultations from "../hooks/useConsultations";

import ConsultationTable from "../components/ConsultationTable";

import UpdateConsultationModal from "../components/UpdateConsultationModal";

import {
  deleteConsultation,
} from "../api/consultationApi";

export default function ConsultationLeads() {

  const {
    consultations,
    loading,
    refresh,
  } = useConsultations();

  const [
    selectedConsultation,
    setSelectedConsultation,
  ] = useState(null);

  const [
    search,
    setSearch,
  ] = useState("");

  const filteredConsultations =
    (consultations || []).filter((item) => {

      const text = `
        ${item.name}
        ${item.whatsapp}
      `.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    });

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this consultation lead?"
        );

      if (!confirmDelete) return;

      try {

        await deleteConsultation(id);

        refresh();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to delete consultation lead"
        );
      }
    };

  return (
    <AdminLayout>

      <div className="space-y-6">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Consultation Leads
          </h1>

          <p className="text-gray-500 mt-2">
            Leads captured from the site-wide popup form
          </p>

        </div>

        <div
          className="
            bg-white
            p-4
            rounded-2xl
            shadow
          "
        >

          <input
            type="text"
            placeholder="Search by name, WhatsApp, or heading..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

        {loading ? (

          <div
            className="
              bg-white
              p-10
              rounded-2xl
              shadow
              text-center
            "
          >
            Loading Consultation Leads...
          </div>

        ) : (

          <ConsultationTable
            consultations={filteredConsultations}
            onView={
              setSelectedConsultation
            }
            onDelete={
              handleDelete
            }
          />

        )}

        {selectedConsultation && (

          <UpdateConsultationModal
            consultation={selectedConsultation}
            onClose={() =>
              setSelectedConsultation(
                null
              )
            }
            onUpdated={() => {
              refresh();

              setSelectedConsultation(
                null
              );
            }}
          />

        )}

      </div>

    </AdminLayout>
  );
}