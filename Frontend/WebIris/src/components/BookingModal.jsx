import { useState } from "react"

const BookingModal = ({
  open,
  onClose,
  selectedDate,
  centers,
  reservedAppointments,
  onCreateBooking,
}) => {
  const [centerId, setCenterId] = useState("")
  const [serviceId, setServiceId] = useState("")
  const [specialistId, setSpecialistId] = useState("")
  const [time, setTime] = useState("")
  const [form, setForm] = useState({ nombre: "", correo: "", telefono: "" })

  if (!open) return null

  const selectedCenter = centers.find((c) => c.id == centerId)
  const selectedService = selectedCenter?.specialties.find((s) => s.id == serviceId)
  const selectedSpecialist = selectedService?.doctors.find((d) => d.id == specialistId)

  const reservedTimes = reservedAppointments
    .filter(
      (r) =>
        r.doctorId == specialistId &&
        r.date === selectedDate?.toISOString().split("T")[0]
    )
    .map((r) => r.time)

  const handleSubmit = async () => {
    if (!specialistId || !time || !form.nombre || !form.correo || !form.telefono) {
      return alert("Por favor, completa todos los campos")
    }

    const bookingData = {
      specialistId: parseInt(specialistId),
      date: selectedDate.toISOString().split("T")[0],
      time,
      cliente: {
        nombre: form.nombre,
        correo: form.correo,
        telefono: form.telefono,
      }
    }

    await onCreateBooking(bookingData)

    setForm({ nombre: "", correo: "", telefono: "" })
    setCenterId("")
    setServiceId("")
    setSpecialistId("")
    setTime("")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-[#fffdf0] w-full max-w-lg rounded-2xl shadow-lg p-6 relative">
        
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-[#781040]">
          Agendar sesión
        </h2>

        <p className="text-sm mb-4 text-gray-600">
          Fecha seleccionada:{" "}
          <span className="font-semibold">
            {selectedDate?.toLocaleDateString("es-CL", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </p>

        <div className="flex flex-col gap-3">

          {/* Modalidad / Centro */}
          <select
            className="border rounded p-2"
            value={centerId}
            onChange={(e) => setCenterId(e.target.value)}
          >
            <option value="">Seleccione modalidad</option>
            {centers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Servicio */}
          {selectedCenter && (
            <select
              className="border rounded p-2"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
            >
              <option value="">Seleccione servicio</option>
              {selectedCenter.specialties.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          )}

          {/* Especialista */}
          {selectedService && (
            <select
              className="border rounded p-2"
              value={specialistId}
              onChange={(e) => setSpecialistId(e.target.value)}
            >
              <option value="">Seleccione especialista</option>
              {selectedService.doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          )}

          {/* Horario */}
          {selectedSpecialist && (
            <select
              className="border rounded p-2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="">Seleccione horario</option>
              {selectedSpecialist.slots.map((slot) => (
                <option
                  key={slot}
                  value={slot}
                  disabled={reservedTimes.includes(slot)}
                >
                  {slot} {reservedTimes.includes(slot) ? "(ocupado)" : ""}
                </option>
              ))}
            </select>
          )}

          {/* Datos del cliente */}
          <input
            type="text"
            placeholder="Nombre completo"
            className="border rounded p-2"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            className="border rounded p-2"
            value={form.correo}
            onChange={(e) => setForm({ ...form, correo: e.target.value })}
          />

          <input
            type="tel"
            placeholder="Teléfono"
            className="border rounded p-2"
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#e52421] hover:bg-[#781040] text-white py-2 mt-6 rounded-lg transition"
        >
          Confirmar sesión
        </button>
      </div>
    </div>
  )
}

export default BookingModal 