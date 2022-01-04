import {ProfileResponse, UpdateProfileRequest} from "@gautierblandin/types";
import {API} from "../config/config";

export async function getUserProfile(): Promise<ProfileResponse> {
    const response = await API.get("/users/profile");
    return response.data as ProfileResponse;
}

export async function updateUserProfile(request: UpdateProfileRequest): Promise<ProfileResponse> {
    const response = await API.put("/users/profile", request);
    return response.data as ProfileResponse;
}
