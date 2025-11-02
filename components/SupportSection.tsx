import React from "react";
import { useNavigate } from "react-router-dom";
import { getTherapistDetails } from "../services/therapistService";

type TherapistProfileProps = { therapistId: string };

const TherapistProfile: React.FC<TherapistProfileProps> = ({ therapistId }) => {
  const navigate = useNavigate();
  const therapistDetails = getTherapistDetails(therapistId) as any;

  if (!therapistDetails) return <div className="p-4">Therapist not found</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-2">
      <h2 className="text-2xl font-bold">{therapistDetails.name}</h2>
      {therapistDetails.email && <p>Email: {therapistDetails.email}</p>}
      {therapistDetails.phone && <p>Phone: {therapistDetails.phone}</p>}
      {therapistDetails.address && <p>Address: {therapistDetails.address}</p>}
      {therapistDetails.specialty && <p>Specialty: {therapistDetails.specialty}</p>}
      {therapistDetails.experience && <p>Experience: {therapistDetails.experience}</p>}
      {therapistDetails.license && <p>License: {therapistDetails.license}</p>}
      {therapistDetails.licenseNumber && <p>License Number: {therapistDetails.licenseNumber}</p>}
      {therapistDetails.licenseState && <p>License State: {therapistDetails.licenseState}</p>}
      {therapistDetails.licenseType && <p>License Type: {therapistDetails.licenseType}</p>}
      {therapistDetails.licenseStatus && <p>Status: {therapistDetails.licenseStatus}</p>}
      {therapistDetails.licenseExpiration && <p>Expires: {therapistDetails.licenseExpiration}</p>}
      {therapistDetails.licenseIssuingAuthority && (
        <p>Authority: {therapistDetails.licenseIssuingAuthority}</p>
      )}
      <div className="pt-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TherapistProfile;
