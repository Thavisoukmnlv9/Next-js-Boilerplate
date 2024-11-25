import { z } from "zod";

export const formSchema = z.object({
    tel: z
        .string()
        .min(1, { message: "ກະລຸນາໃສ່ເບີໂທຂອງທ່ານ" })
        .regex(/^\d{8,}$/, { message: "ເບີໂທທີ່ປ້ອນບໍ່ຖືກຕ້ອງ" }),
    fullName: z
        .string()
        .min(1, { message: "ກະລຸນາໃສ່ຊື່ຂອງທ່ານ" }),
    email: z
        .string()
        .email({ message: "ກະລຸນາໃສ່ອີເມວຂອງທ່ານໃຫ້ຖືກຕ້ອງ" })
        .nullable()
        .optional()
});