import TaskDetails from "@/components/mobile/task-details";
import { SpecialTask } from "@/types";
import axios from "axios";

interface TaskPageProps {
  params: {
    taskId: string;
  };
}

export async function generateStaticParams() {
  const specialTask = await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/task/special`)
    .then((res) => res?.data?.data?.task as SpecialTask[]);

  return specialTask.map((task) => ({
    taskId: task.id,
  }));
}

const page = ({ params }: TaskPageProps) => {
  return (
    <>
      <TaskDetails taskId={params.taskId} />
    </>
  );
};

export default page;
