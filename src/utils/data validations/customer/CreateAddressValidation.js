import { z } from "zod";

export const createAddressValidation = {
    params : z.object({
        userId : z.string().min(1, "User ID is required and must be a positive number !!!")
    }),
    body : z.object({
        buildingNumber: z.string().min(1, "Building Number is required !!!"), 
        floorNumber: z.string().min(1, "Floor Number is required !!!"), 
        apartment: z.string().min(1, "Apartment is required !!!"),
        area: z.string().min(1, "Area is required !!!"), 
        nearbyLandmark: z.string().min(1, "Nearby Landmark is required !!!"),
        city: z.string().min(1, "City is required !!!"),
        state: z.string().min(1, "State is required !!!"),
        postalCode: z.number().min(100000, "Postal Code must be at least 6 digits long !!!").max(999999, "Postal Code can't be longer than 6 digits !!!"),
        country: z.string().min(1, "Country is required !!!"),
        addressType: z.enum(["HOME", "OFFICE", "OTHER"], "Address Type must be one of the predefined values !!!"), 
    })
}