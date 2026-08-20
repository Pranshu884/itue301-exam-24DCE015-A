function AppointmentCard({
  patientName,
  doctorName,
  date,
  timeSlot,
  status
}) {
  return (
    <div className={`appointment-card ${status}`}>
      <h3>Appointment</h3>

      <p>Patient: {patientName}</p>
      <p>Doctor: {doctorName}</p>
      <p>Date: {date}</p>
      <p>Time Slot: {timeSlot}</p>
      <p>Status: {status}</p>
    </div>
  );
}

export default AppointmentCard;