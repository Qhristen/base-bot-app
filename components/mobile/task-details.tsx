"use client";

import React, { useContext } from "react";
import Container from "../container";
import Link from "next/link";
import { ArrowLeft, MoneyBagColoredIcon } from "@/assets/icons";
import { Button } from "../ui/Button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SpecialTask, TaskType } from "@/types";
import { useRouter } from "next/navigation";
import { useSubmitSpecialTask } from "@/hooks/useSubmitTask";
import { TelegramContext } from "@/context/telegram-context";
import CircularProgressBar from "../CircularProgressBar";

interface ITask {
  taskId: string;
}

const TaskDetails = ({ taskId }: ITask) => {
  const { user } = useContext(TelegramContext);

  const { isPending, error, data } = useQuery({
    queryKey: ["specialTasks", taskId],
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/task/special/${taskId}`)
        .then((response) => response.data?.data?.task as SpecialTask),
  });

  const submitSpecialTask = useSubmitSpecialTask();

  if (isPending)
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
        <h1 className="text-2xl font-medium py-3">{data?.name}</h1>
        <p className="text-gray-light">
          We regularly share valuable content on our socials Join us there and
          get the rewards
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
                  <span className="text-sm">{data?.point} </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray rounded-2xl p-4 mt-5">
          {data?.activities?.map((data, i) => (
            <div key={i} className="py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-white">
                    <h4 className="font-medium text-white">{data.name}</h4>
                  </div>
                </div>
                <Button size={`sm`} variant={`primary`}>
                  Go
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={async (event) => {
            event.preventDefault();
            await submitSpecialTask.mutate({
              name: data?.name,
              taskId: data?.id,
              userId: String(user?.id),
              status: "completed",
              point: data?.point,
              type: "special",
            });
          }}
          disabled={submitSpecialTask.isPending}
          size={`lg`}
          variant={`primary`}
          className="w-full mt-10"
        >
          Submit task
        </Button>
      </div>
    </Container>
  );
};

export default TaskDetails;
