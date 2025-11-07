export interface AtgPrediction {
  // 0-based position in sequence
  position0: number;
  // 1-based position for display
  position1: number;
  probability: number; // 0..1
  peptideLength: number;
}

export interface PredictionResult {
  species: string;
  atgCount: number;
  predictions: AtgPrediction[];
}

