class WebWorkerService {
  private worker: Worker | null;

  constructor() {
    this.worker = null;
  }

  invokeFunction = async (func: Function, ...args: any[]): Promise<any> => {
    if (typeof Worker === "undefined") {
      console.error("Web Workers are not supported in this environment.");
      return;
    }
    if (this.worker) {
      this.terminate();
    }
    return new Promise((resolve, reject) => {
      const blob = new Blob(
        [
          `
      onmessage = function(e) {
        const func = ${func.toString()};
        const result = func.apply(null, e.data);
        postMessage(result);
      }`,
        ],
        { type: "application/javascript" }
      );
      const blobURL = URL.createObjectURL(blob);
      const worker = new Worker(blobURL);

      worker.onmessage = function (e) {
        resolve(e.data);
        worker.terminate();
      };
      worker.onerror = function (e) {
        reject(e.message);
        worker.terminate();
      }
      worker.postMessage(args);
    });
  };

  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

export default WebWorkerService;
