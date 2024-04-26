import { Repository } from "typeorm";
import { CreateTagComentDto } from "./dto/create-tag_coment.dto";
import { UpdateTagComentDto } from "./dto/update-tag_coment.dto";
import { Coment } from "../coment/entities/coment.entity";
import { TagComent } from "./entities/tag_coment.entity";
import { TagService } from "../tag/tag.service";
export declare class TagComentService {
    private readonly tagComentRepository;
    private readonly tagService;
    constructor(tagComentRepository: Repository<TagComent>, tagService: TagService);
    create(createTagComentDto: CreateTagComentDto): Promise<void>;
    findStack(coment: Coment): Promise<string[]>;
    update(updateTagComentDto: UpdateTagComentDto): Promise<string[]>;
    remove(coment: Coment): Promise<void>;
}
