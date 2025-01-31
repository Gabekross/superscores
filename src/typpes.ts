export type Match = {
    id: string;
    home_team: { name: string } | null;
    away_team: { name: string } | null;
    home_score: number;
    away_score: number;
    match_date: string;
    status: string;
};

export type TeamStanding = {
    id: string;
    team_id: string;
    matches_played: number;
    wins: number;
    draws: number;
    losses: number;
    goals_scored: number;
    goals_conceded: number;
    points: number;
    team?: { name: string } | null; // 👈 Added team name reference
};

export type MatchEvent = {
    id: string;
    event_type: string;
    player_name: string;
    event_time: number;
};