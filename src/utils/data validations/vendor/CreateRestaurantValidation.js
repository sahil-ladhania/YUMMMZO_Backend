import { z } from "zod";

export const createRestaurantValidation = {
    body : z.object({
        userId: z.number().min(1 , "User Id is required and must be a positive number !!!"),  
        restaurantName: z.string().min(2, "Restaurant Name name must be at least 2 characters long !!!").max(20, "Restaurant Name can't be longer than 20 characters !!!"),
        ownerName: z.string().min(2, "Owner Name name must be at least 2 characters long !!!").max(20, "Owner Name can't be longer than 20 characters !!!"),
        ownerEmail: z.string().email("Invalid email format !!!"),
        ownerPhoneNumber: z.string().min(10, "Phone number must be at least 10 digits long !!!").max(10, "Phone number can't be longer than 10 digits !!!").regex(/^\d+$/, "Phone number must only contain digits !!!"),
        buildingNumber: z.string().min(1, "Building number is required !!!"),  
        floorNumber: z.string().min(1, "Floor number is required !!!"), 
        area: z.string().min(1, "Area is required !!!"),  
        city: z.string().min(1, "City is required !!!"),  
        nearbyLandmark: z.string().min(1, "Nearby landmark is required !!!"),  
        state: z.string().min(1, "State is required !!!"),
        postalCode: z.string().min(6, "Postal Code must be at least 6 digits long !!!").max(6, "Postal Code can't be longer than 6 digits !!!").regex(/^\d{6}$/, "Postal code should be 6 digits !!!"),
        country: z.string().min(2, "Country Name must be at least 2 characters long !!!").max(20, "Country Name can't be longer than 20 characters !!!"),
        restaurantImage: z.string().url("Invalid URL format for image !!!"),
        cuisines: z.array(z.number()).min(1, "At least one cuisine must be selected !!!"), 
        openingTime: z.string().min(1, "Opening time is required !!!"), 
        closingTime: z.string().min(1, "Closing time is required !!!"), 
        openingDays: z.array(z.number()).min(1, "At least one opening day must be selected !!!"),  
        isPureVeg: z.boolean(),  
        priceForTwo: z.number().min(0, "Price for two must be a positive number !!!"), 
    }),
}