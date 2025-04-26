import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from '@config/firebase';

class FirebaseService {
  private app;
  private analytics;

  initialize = () => {
    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
  }

  getAppInstance = () => {
    return this.app;
  }

  getAnalyticsInstance = () => {
    return this.analytics;
  }
}

const FBService = new FirebaseService();

export default FBService;