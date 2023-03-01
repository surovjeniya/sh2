import { ProfileService } from "./profile.service"
import{Test} from '@nestjs/testing'
import { CACHE_MANAGER } from "@nestjs/common/cache"

const mockCacheManager = {
    set:jest.fn(),
    get:jest.fn(),
}

describe('ProfileService',() => {
    let profileService:ProfileService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports:[],
            controllers:[],
            providers:[
                ProfileService,
                {
                    provide:CACHE_MANAGER,
                    useValue:mockCacheManager
                }
            ]
        }).compile()
        profileService = moduleRef.get<ProfileService>(ProfileService)
    })
    it('shoud be defined',() => {
        expect(profileService).toBeDefined()
    })
})