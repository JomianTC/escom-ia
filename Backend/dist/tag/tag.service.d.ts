import { Repository } from "typeorm";
import { PaginationDto } from "../common/dto/pagination.dto";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { Tag } from "./entities/tag.entity";
export declare class TagService {
    private readonly tagRepository;
    constructor(tagRepository: Repository<Tag>);
    create(createTagDto: CreateTagDto): Promise<{
        mensaje: string;
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        tags: Tag[];
        total: number;
    }>;
    findStack(ids: string[]): Promise<Tag[]>;
    update(id: string, updateTagDto: UpdateTagDto): Promise<{
        mensaje: string;
        tag: {
            nombre: string;
            id: string;
            tagComent: import("../tag_coment/entities/tag_coment.entity").TagComent[];
        } & Tag;
    }>;
    remove(id: string): Promise<{
        mensaje: string;
    }>;
}
