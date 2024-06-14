"use client";

import { ArrowLeft, MoneyBagColoredIcon } from "@/assets/icons";
import { TelegramContext } from "@/context/telegram-context";
import {
  fetchAlluserTask,
  fetchSingleSpecialActivity,
  fetchUserActivity,
  submitSingleUserActivity,
  submitSpecialTask,
} from "@/redux/feature/task";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useContext, useEffect } from "react";
import CircularProgressBar from "../CircularProgressBar";
import Container from "../container";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/redux/feature/user";

interface ITask {
  taskId: string;
}

const TaskDetails = ({ taskId }: ITask) => {
  const { user, webApp } = useContext(TelegramContext);
  const dispatch = useAppDispatch();
  const { singleSpecialTask, status, userActivities, userTasks } =
    useAppSelector((state) => state.task);

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchSingleSpecialActivity(taskId));
  }, [dispatch, taskId]);

  useEffect(() => {
    dispatch(fetchUserActivity());
    dispatch(fetchAlluserTask());
  }, [dispatch, user]);

  const isActivityCompleted = (activityId: string) => {
    const activityStatus =
      userActivities &&
      userActivities.find(
        (status) =>
          status.activityId === activityId && status.userId === String(user?.id)
      );
    return activityStatus ? activityStatus.clicked : false;
  };

  const allTasksCompleted =
    singleSpecialTask &&
    singleSpecialTask.activities.every(
      (activity) =>
        userActivities &&
        userActivities.some(
          (completedTask) =>
            completedTask.activityId === activity.id && completedTask.userId === String(user?.id) &&
            completedTask.clicked === true
        )
    );

  const isTaskSubmited =
    userTasks &&
    userTasks.find(
      (userT) =>
        userT.taskId === String(singleSpecialTask?.id) &&
        userT.userId === String(user?.id)
    );

  if (status === "loading")
    return (
      <CircularProgressBar
        percentage={10}
        size={80}
        strokeWidth={12}
        color="white"
      />
    );

  return (
    <Container>
      <div className="text-white p-5">
        <Link
          href={`/mobile/task`}
          className="flex items-center justify-start py-4"
        >
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-medium py-3">{singleSpecialTask?.name}</h1>
        <p className="text-gray-light">
          We regularly post valuable content on our social media. Connect with
          us there to earn rewards!
        </p>
        <div className="bg-gray rounded-2xl p-4 mt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray">
                <MoneyBagColoredIcon className="scale-75" />
              </div>
              <div className="text-white">
                <h4 className="font-normal text-white">Reward</h4>
                <div className="flex items-center gap-2 font-normal text-white">
                  <span className="text-sm">{singleSpecialTask?.point} </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray rounded-2xl p-4 mt-5">
          {singleSpecialTask?.activities?.map((activity, i) => (
            <div key={i} className="py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-white">
                    <h4 className="font-medium text-white">{activity.name}</h4>
                  </div>
                </div>

                <Button
                  disabled={isActivityCompleted(activity.id)}
                  onClick={(e) => {
                    dispatch(
                      submitSingleUserActivity({
                        activityId: activity.id,
                        clicked: true,
                        userId: String(user?.id),
                        taskId: singleSpecialTask.id,
                      })
                    );
                    dispatch(fetchUserActivity());
                    dispatch(fetchAlluserTask());
                    dispatch(fetchSingleSpecialActivity(taskId));
                    webApp?.openLink(`${activity.link}`);
                    // router.push(`/single-task/${singleSpecialTask?.id}`);
                    // webApp?.BackButton.show();
                  }}
                  size={`sm`}
                  variant={`primary`}
                >
                  Go
                </Button>
              </div>
            </div>
          ))}
        </div>

        {!isTaskSubmited ? (
          <Button
            disabled={!allTasksCompleted}
            onClick={() => {
              dispatch(
                submitSpecialTask({
                  name: singleSpecialTask?.name,
                  status: "completed",
                  point: singleSpecialTask?.point,
                  type: "special",
                  taskId: singleSpecialTask?.id,
                  userId: String(user?.id),
                })
              );
              dispatch(fetchUser(String(user?.id)));
              dispatch(fetchUserActivity());
              dispatch(fetchAlluserTask());
              router.push(`/mobile/task`);
            }}
            size={`lg`}
            variant={`primary`}
            className="w-full mt-10"
          >
            Submit task
          </Button>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
};

export default TaskDetails;
