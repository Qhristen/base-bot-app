import { store } from "@/redux/store";
import { incrementMiningLimit } from "@/redux/feature/user";

class IntervalService {
  private intervalId: NodeJS.Timeout | null = null;
  private startTime: number | null = null;

  startInterval(speed: number) {
    if (!this.intervalId) {
        this.startTime = Date.now();
        this.intervalId = setInterval(() => {
          const currentTime = Date.now();
          const elapsedTime = currentTime - (this.startTime as number);
    
          if (elapsedTime >= 24 * 60 * 60 * 1000) {
            // 24 hours in milliseconds
            this.stopInterval();
          } else {
            store.dispatch(incrementMiningLimit(speed));
          }
        }, 1000); // Set interval to 1 second
    };

  }

  stopInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

const intervalService = new IntervalService();
export default intervalService;
