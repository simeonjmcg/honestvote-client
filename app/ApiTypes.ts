export type AppId        = number | string | Symbol;
export type UserId       = AppId;
export type ElectionId   = AppId;
export type RaceId       = AppId;
export type PositionId   = AppId;
export type VotePriority = AppId;

export interface Election {
  id: ElectionId;
  name: string;
  term: string;
  races: Race[];
  type: ElectionType;
  canHaveMultiTicket: boolean;
  candidateCanRunForMultiple: boolean;
  candidateCanVote: boolean;
  candidateCanVoteForSelf: boolean;
}

export enum ElectionType {
  FirstPastThePost,
  InstantRunoff,
  MultiRunoff,
}

export interface Race {
  id: RaceId;
  name: string;
  allowedPositions: PositionId[];
  tickets: Ticket[];
}


export interface Ticket {
  positionEntries: PositionEntry[];
  votes: Vote[];
}

export interface PositionEntry {
  userId: UserId;
  positionId: PositionId;
}

export interface ElectionPosition {
  id: PositionId;
  name: string;
}

export interface Vote {
  voterId: UserId;
  votePriority: VotePriority; // used in rank based voting. for now always 1
}

export interface User {
  id: UserId;
  permissions: UserPermissions;
}

export interface UserPermissions {
  canCreateElection: boolean;
  canManageElection: ElectionId[];
  canVote: Array<ElectionId | RaceId>;
  canRun: Array<ElectionId | RaceId>;
}

export const elections: Election[] = [
  {
    id: 0,
    name: "West Chester University Executive Board",
    term: "Spring 2020",
    type: ElectionType.FirstPastThePost,
    races: [
      {
        id: 1,
        name: "Presidential",
        allowedPositions: [11],
        tickets: [
          {
            positionEntries: [{ userId: 3, positionId: 11 }],
            votes: [{ voterId: 5, votePriority: 1 }, { voterId: 6, votePriority: 1 }, { voterId: 7, votePriority: 1 }],
          }, {
            positionEntries: [{ userId: 4, positionId: 11 }],
            votes: [{ voterId: 8, votePriority: 1 }, { voterId: 9, votePriority: 1 }, { voterId: 10, votePriority: 1 }],
          },
        ],
      }, {
        id: 2,
        name: "Secretorial",
        allowedPositions: [12],
        tickets: [
          {
            positionEntries: [{ userId: 5, positionId: 12 }],
            votes: [{voterId: 3, votePriority: 1}, {voterId: 4, votePriority: 1}, {voterId: 7, votePriority: 1}],
          }, {
            positionEntries: [{ userId: 6, positionId: 12 }],
            votes: [{voterId: 8, votePriority: 1}, {voterId: 9, votePriority: 1}, {voterId: 10, votePriority: 1}],
          },
        ],
      },
    ],
    canHaveMultiTicket: false,
    candidateCanRunForMultiple: false,
    candidateCanVote: true,
    candidateCanVoteForSelf: false,
  },
];

export const positions: ElectionPosition[] = [
  { id: 11, name: "President" },
  { id: 12, name: "Secretary" },
];

export const users: User[] = [
  { id: 3,  permissions: { canCreateElection: true,  canManageElection: [0], canVote: [0], canRun: [0] }},
  { id: 4,  permissions: { canCreateElection: false, canManageElection: [],  canVote: [0], canRun: [0] }},
  { id: 5,  permissions: { canCreateElection: false, canManageElection: [],  canVote: [0], canRun: [0] }},
  { id: 6,  permissions: { canCreateElection: false, canManageElection: [],  canVote: [0], canRun: [0] }},
  { id: 7,  permissions: { canCreateElection: false, canManageElection: [],  canVote: [0], canRun: []  }},
  { id: 8,  permissions: { canCreateElection: false, canManageElection: [],  canVote: [0], canRun: []  }},
  { id: 9,  permissions: { canCreateElection: false, canManageElection: [],  canVote: [0], canRun: []  }},
  { id: 10, permissions: { canCreateElection: false, canManageElection: [],  canVote: [0], canRun: []  }},
];
