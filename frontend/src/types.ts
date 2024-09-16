type DuelFormType = {
    title?: string;
    description?: string; 
};

type DuelFormTypeError = {
    title?: string;
    description?: string; 
    expire_at?: string; 
    image?: string; 
};

type DuelTypes = {
    id: string;
    user_id: string
    title: string;
    description: string; 
    image: string; 
    expire_at: string; 
    created_at: string; 
    DuelItem: Array<DuelItem>
    DuelComment: Array<DuelComment>
};

type DuelItemForm = {
    image: File | null;
};

type DuelItem = {
    id: string;
    count: number;
    image: string
};

type DuelComment = {
    id: string;
    comment: number;
    created_at: string
};