import { useCallback, useState } from "react";
import { Calendar } from "./components/Calendar";
import { Notification } from "./components/Notification";

interface Duration {
  start?: Date | number | null;
  end?: Date | number | null;
}

interface DurationFormat {
  start?: string | null;
  end?: string | null;
}

function App() {
  const [duration, setDuration] = useState<Duration>({});
  const [durationFormat, setDurationFormat] = useState<DurationFormat>({});

  const handleChange = useCallback((start: number, end: number | null) => {
    setDuration({ start, end });
  }, []);

  const handleFormatedChange = useCallback((start: string, end: string | null) => {
    setDurationFormat({ start, end });
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="hidden flex-col gap-2">
        <div className="flex items-center justify-between gap-1 border rounded-lg h-12">
          <span className="w-2/5 text-center">{durationFormat.start ?? "Empty"}</span>
          <span>{" => "}</span>
          <span className="w-2/5 text-center">{durationFormat.end ?? "Empty"}</span>
        </div>
        <Calendar
          startDate={duration.start}
          endDate={duration.end}
          onChange={handleChange}
          onFormatedChange={handleFormatedChange}
        />
      </div>

      <div className="mt-4 border border-red-100 p-3">
        <Notification />
      </div>
    </div>
  );
}

export default App;
