import { MoneyBagColoredIcon, ShareIcon } from "@/assets/icons";
import { TelegramContext } from "@/context/telegram-context";
import { useToast } from "@/hooks/use-toast";
import { fetchUserReferals } from "@/redux/feature/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { User } from "@/types";
import { formatCompactNumber } from "@/utils/formatNumber";
import { useContext, useEffect } from "react";

const Referrals = () => {
  const { user } = useContext(TelegramContext);
  const { user: userData, userReferals } = useAppSelector(
    (state) => state.user
  );

  const { toast } = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserReferals(String(user?.id)));
  }, [dispatch, user]);

  const onCopy = (data: string) => {
    navigator.clipboard.writeText(data);
    toast({ description: "Referral link copied." });
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center select-none">
        <div className="text-gray-light">Total referrals</div>
        <h1 className="text-4xl font-black text-white">
          {userData?.friendsReferred}
        </h1>
      </div>
      <div className="bg-gray rounded-2xl p-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-white">
              <h4 className="font-semibold text-xl text-white">
                Your invite link
              </h4>
              <div className="flex items-center gap-2 font-normal text-white">
                <span className="text-sm">
                  {`${userData?.referralLink.slice(0, 15)}....`}
                </span>
              </div>
            </div>
          </div>
          <div onClick={() => onCopy(userData?.referralLink as string)}>
            <ShareIcon />
          </div>
        </div>
      </div>
      <p className="text-gray-light py-4">
        Invite a friend with Telegram Premium and earn additional{" "}
        <span className="font-semibold text-white">+50 000</span> for you and
        your friend.
      </p>
      <h1 className="text-2xl font-medium text-white py-4">My Referrals</h1>

      {userReferals.map((referral, i) => (
        <div key={i}>
          <h4 className="font-bold text-white">{referral.referredTo.telegramUserName}</h4>
          <div className="flex items-center justify-between text-white">
            <span>
              {referral.referredTo.league} | {formatCompactNumber(referral.referredTo.totalPoint)}
            </span>
            <span>+{formatCompactNumber(referral.point)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Referrals;
