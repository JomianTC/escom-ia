import { PaginationDto } from "../common/dto/pagination.dto";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { TagService } from "./tag.service";
export declare class TagController {
    private readonly tagService;
    constructor(tagService: TagService);
    create(createTagDto: CreateTagDto): Promise<{
        mensaje: string;
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        tags: import("./entities/tag.entity").Tag[];
        total: number;
    }>;
    update(id: string, updateTagDto: UpdateTagDto): Promise<{
        mensaje: string;
        tag: {
            nombre: string;
            id: string;
            tagComent: import("../tag_coment/entities/tag_coment.entity").TagComent[];
        } & import("./entities/tag.entity").Tag;
    }>;
    remove(id: string): Promise<{
        mensaje: string;
    }>;
}
