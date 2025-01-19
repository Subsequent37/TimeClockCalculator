function calculateClockOut() {
  // Get input values
  const morningIn = document.getElementById("morningIn").value;
  const lunchOut = document.getElementById("lunchOut").value;
  const afternoonIn = document.getElementById("afternoonIn").value;

  if (!morningIn || !lunchOut || !afternoonIn) {
    document.getElementById("result").innerText = "Please fill out all fields.";
    return;
  }

  // Convert times to Date objects
  const morningInTime = new Date(`1970-01-01T${morningIn}:00`);
  const lunchOutTime = new Date(`1970-01-01T${lunchOut}:00`);
  const afternoonInTime = new Date(`1970-01-01T${afternoonIn}:00`);

  // Calculate total hours worked before lunch
  const hoursBeforeLunch = (lunchOutTime - morningInTime) / (1000 * 60 * 60);

  // Calculate clock-out time
  const totalRequiredHours = 8;
  const hoursRemaining = totalRequiredHours - hoursBeforeLunch;
  const clockOutTime = new Date(afternoonInTime.getTime() + hoursRemaining * 60 * 60 * 1000);

  // Format result as HH:MM
  const formattedClockOut = clockOutTime.toTimeString().split(" ")[0].slice(0, 5);

  // Display result
  document.getElementById("result").innerText = `You should clock out at: ${formattedClockOut}`;
}

document.getElementById("lunchOut").addEventListener("input", calculateTimeWorked);

function calculateTimeWorked() {
  const morningIn = document.getElementById("morningIn").value;
  const lunchOut = document.getElementById("lunchOut").value;

  if (morningIn && lunchOut) {
    const morningInTime = new Date(`1970-01-01T${morningIn}:00`);
    const lunchOutTime = new Date(`1970-01-01T${lunchOut}:00`);

    const timeWorkedMillis = lunchOutTime - morningInTime;
    const hoursWorked = Math.floor(timeWorkedMillis / (1000 * 60 * 60));
    const minutesWorked = Math.floor((timeWorkedMillis % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("timeWorkedMorning").innerText = `Time Worked: ${hoursWorked}h ${minutesWorked}m`;
  } else {
    document.getElementById("timeWorkedMorning").innerText = "Time Worked: --:--";
  }
}
