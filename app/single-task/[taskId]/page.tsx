import TaskDetails from "@/components/mobile/task-details";

interface TaskPageProps {
  params: {
    taskId: string;
  };
}
const page = ({ params }: TaskPageProps) => {
  return (
    <>
      <TaskDetails taskId={params.taskId} />
    </>
  );
};

export default page;
