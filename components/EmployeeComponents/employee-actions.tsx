import { Link } from "lucide-react";

export function EmployeeActions({ employeeId }: { employeeId: string }) {
  return (
    <div>
      <Link href={`/employees/${employeeId}`}>
        View Details
      </Link>
      {/* ... other actions ... */}
    </div>
  )
} 