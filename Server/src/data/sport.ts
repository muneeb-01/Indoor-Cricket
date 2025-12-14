export interface Sport {
  id: string
  name: string
  pricePerHour: number
  description: string
}

export const sports: Sport[] = [
  {
    id: "snooker",
    name: "Snooker",
    pricePerHour: 500,
    description: "Standard snooker table booking per hour.",
  },
  {
    id: "cricket",
    name: "Indoor Cricket",
    pricePerHour: 1500,
    description: "Indoor cricket pitch booking for 1 hour.",
  },
  {
    id: "tabletennis",
    name: "Table Tennis",
    pricePerHour: 300,
    description: "Table tennis table booking for 1 hour.",
  },
  {
    id: "badminton",
    name: "Badminton",
    pricePerHour: 700,
    description: "Indoor badminton court booking per hour.",
  },
]
