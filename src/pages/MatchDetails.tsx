import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabase";
import { MatchEvent } from "../typpes";

const MatchDetails: React.FC = () => {
    const { matchId } = useParams();
    const [events, setEvents] = useState<MatchEvent[]>([]);

    useEffect(() => {
        const fetchMatchEvents = async () => {
            const { data, error } = await supabase
                .from("match_events")
                .select(`
                    id, event_type, event_time,
                    player:player_id (name)
                `)
                .eq("match_id", matchId)
                .order("event_time", { ascending: true });

            if (error) {
                console.error("Error fetching match events:", error);
                return;
            }

            // ✅ Ensure player_name is extracted from the first item of the array
            const formattedData: MatchEvent[] = data.map((event: any) => ({
                id: event.id,
                event_type: event.event_type,
                event_time: event.event_time,
                player_name: event.player?.length > 0 ? event.player[0].name : null, // ✅ Extract first item
            }));

            setEvents(formattedData);
        };

        fetchMatchEvents();
    }, [matchId]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Match Events</h2>
            <ul>
                {events.map((event) => (
                    <li key={event.id} className="p-2 border-b">
                        {event.event_time}′ - {event.player_name ?? "Unknown"} ({event.event_type})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MatchDetails;
