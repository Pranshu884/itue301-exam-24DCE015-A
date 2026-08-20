import { useState } from "react";

function BookingPage() {
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    timeSlot: ""
  });

  const [selectedDoctor, setSelectedDoctor] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div>
      <h1>Book Appointment</h1>

      <form>
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={formData.patientName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="doctorName"
          placeholder="Doctor Name"
          value={formData.doctorName}
          onChange={(event) => {
            handleChange(event);
            setSelectedDoctor(event.target.value);
          }}
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type="text"
          name="timeSlot"
          placeholder="Time Slot"
          value={formData.timeSlot}
          onChange={handleChange}
        />
      </form>

      <h3>Entered Patient: {formData.patientName}</h3>

      <h3>Selected Doctor: {selectedDoctor}</h3>
    </div>
  );
}

export default BookingPage;